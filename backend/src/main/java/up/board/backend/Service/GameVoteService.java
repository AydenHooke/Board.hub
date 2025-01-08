package up.board.backend.Service;

import org.springframework.stereotype.Service;

import up.board.backend.Entity.GameVote;
import up.board.backend.Repository.GameVoteRepository;

@Service
public class GameVoteService {

  GameVoteRepository gameVoteRepository;

  public GameVoteService(GameVoteRepository gameVoteRepository) {
    this.gameVoteRepository = gameVoteRepository;
  }

  public GameVote save(GameVote vote) {
    return gameVoteRepository.save(vote);
  }

  public GameVote getGameVote(int accountId, int gameId) {
    return gameVoteRepository.findByAccountIdAndGameId(accountId, gameId);
  }

  public int getVoteSum(int gameId){
    var voteSum = gameVoteRepository.findGameVoteSum(gameId);
    return voteSum == null ? 0 : voteSum;
  }

}